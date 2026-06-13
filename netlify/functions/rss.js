exports.handler = async (event) => {
  const rssUrl = event.queryStringParameters && event.queryStringParameters.url;

  if (!rssUrl) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ error: 'Missing url query parameter' })
    };
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(rssUrl);
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ error: 'Invalid RSS url' })
    };
  }

  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ error: 'Only http and https URLs are allowed' })
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(parsedUrl.toString(), {
      signal: controller.signal,
      headers: {
        'user-agent': 'NewsPulse RSS Proxy/1.0',
        accept: 'application/rss+xml, application/xml, text/xml, */*'
      }
    });

    const body = await response.text();

    return {
      statusCode: response.ok ? 200 : response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300'
      },
      body
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ error: 'Failed to fetch RSS feed', details: error.message })
    };
  } finally {
    clearTimeout(timeoutId);
  }
};
