// server.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from "cors"
import { Vercel } from '@vercel/sdk';
const vercel = new Vercel({
  bearerToken : 'nhhNJZljOsbK1dzPr3LwbkLn'
})

const app = express();
const port = 3000;
app.use(cors())
app.use(bodyParser.json());

app.post('/api/add-cname', async (req: any, res: any) => {
  const {  subdomain, target } = req.body;

  if  (!subdomain || !target) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const response = await axios.put(
      `https://developers.hostinger.com/api/dns/v1/zones/xundan.in`,
      {
        overwrite: true, // You might want to add this to avoid conflicts if needed
        zone: [
          {
            type: 'CNAME',
            name: subdomain,
            ttl: 3600,
            records: [
              {
                content: target.endsWith('.') ? target : target + '.', // Ensure trailing dot
                is_disabled: false,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HOSTINGER_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ message: 'CNAME record added successfully', data: response.data });
  } catch (error: any) {
    console.error('Error adding CNAME record:', error.response?.data || error.message);
    res.status(500).json({ message: 'Internal server error', error: error.response?.data || error.message });
  }
});

app.get('/api/domains', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      'https://developers.hostinger.com/api/dns/v1/zones',
      {
        headers: {
          'Authorization': `Bearer ${process.env.HOSTINGER_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ domains: response.data });
  } catch (error: any) {
    console.error('Error fetching domains:', error?.response?.data || error.message);
    res.status(500).json({ message: 'Failed to fetch domains', error: error?.response?.data });
  }
});

app.post('/api/add-vercel-domain', async (req: any, res: any) => {
  const { subdomain } = req.body;

  if (!subdomain) {
    return res.status(400).json({ message: 'Missing subdomain' });
  }

  const fullDomain = `${subdomain}.xundan.in`;

  try {
    const vercelResponse = await vercel.projects.addProjectDomain({
      idOrName: 'micro-tech',
      requestBody: {
        name: fullDomain,
      },
    });

    res.status(200).json({
      message: `✅ Domain ${fullDomain} added to Vercel project`,
      data: vercelResponse,
    });
  } catch (error: any) {
    console.error('Error adding domain to Vercel:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to add domain to Vercel', error: error.response?.data || error.message });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
