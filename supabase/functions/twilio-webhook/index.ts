import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js';
import twilio from 'npm:twilio';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { message, from } = await req.json();

    // Extract seeker ID from the initial message
    const seekerIdMatch = message.match(/ID: ([a-z0-9]+)/i);
    const seekerId = seekerIdMatch ? seekerIdMatch[1] : null;

    if (seekerId) {
      // Update the job seeker's WhatsApp number
      await supabase
        .from('job_seekers')
        .update({ whatsapp_number: from })
        .eq('seeker_id', seekerId);

      // Initialize the conversation flow
      const client = twilio(
        Deno.env.get('TWILIO_ACCOUNT_SID'),
        Deno.env.get('TWILIO_AUTH_TOKEN')
      );

      await client.messages.create({
        body: `Welcome to JobX! Let's find the perfect job for you. What type of role are you looking for? (e.g., Software Developer, Designer, Marketing)`,
        from: 'whatsapp:+14155238886', // Your Twilio WhatsApp number
        to: from
      });
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});