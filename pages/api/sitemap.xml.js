import axios from 'axios';
import { BASE_URL, APP_URL } from '~/apis';

const STATIC_PAGES = [
  '/',
  '/about',
  '/contact',
  '/collab/explore',
  '/collab/create',
  '/collab/existing/create',
  '/collab/template/explore',
  '/collab/template/create',
  '/discovery',
  '/team/explore',
  '/team/create',
];

export default async function handler(req, res) {
  const response = await axios.get(`${BASE_URL}/api/v1/get-sitemap-urls`);
  const urls = response?.data?.urls;

  // Begin constructing the sitemap XML string
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  // Add URLs for static pages
  STATIC_PAGES.forEach(page => {
    xml += `
      <url>
        <loc>${APP_URL}${page}</loc>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>
    `;
  });

  // Add URLs for collabs
  urls.forEach(urlData => {
    xml += `
      <url>
        <loc>${APP_URL}${urlData.url}</loc>
        <lastmod>${urlData.updatedAt}</lastmod>
        <changefreq>${urlData.changeFreq}</changefreq>
        <priority>${urlData.priority}</priority>
      </url>
    `;
  });

  xml += '</urlset>';

  // Set the content type as XML and send the response
  res.setHeader('Content-Type', 'text/xml');
  res.write(xml);
  res.end();
}
