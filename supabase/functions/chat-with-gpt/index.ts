import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { messages } = await req.json();

    const systemMessage = {
      role: 'system',
      content: `You are AudioMaster, an AI customer service assistant for an audiobook creation platform. Your role is to:
      1. Help users with audiobook conversion and voice customization
      2. Assist with technical issues and platform navigation
      3. Explain pricing plans and features
      4. Provide best practices for audio quality
      5. Handle account-related queries
      
      Keep responses concise, professional, and focused on audiobook-related topics. If unsure, ask for clarification.
      Common topics include:
      - File formats: MP3, WAV, PDF, EPUB, etc.
      - Voice customization options
      - Pricing plans and features
      - Technical requirements
      - Account management
      - Conversion process
      - Audio quality tips`
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          systemMessage,
          ...messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    return new Response(JSON.stringify({
      message: data.choices[0].message.content,
      role: 'assistant'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-with-gpt function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An unexpected error occurred'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});