import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    if (event.httpMethod === 'POST') {
      const { seekerId } = JSON.parse(event.body || '{}');
      
      if (!seekerId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Seeker ID is required' })
        };
      }

      // For now, just return success without storing in database
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true,
          seekerId,
          message: 'Job seeker registered successfully'
        })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  } catch (error: any) {
    console.error('Error handling job seeker:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || 'Internal server error' })
    };
  }
}; 