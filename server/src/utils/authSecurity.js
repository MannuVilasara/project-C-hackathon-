import ipinfo from "ipinfo";
import useragent from "useragent";


export function getClientIp(req) {
  const xff = req.headers["x-forwarded-for"];
  if (xff) {
    return xff.split(",")[0].trim();
  }
  return req.ip;
}


export async function getGeoData(ip) {
  try {
    const response = await ipinfo(ip);
    return {
      ip: response.ip,
      city: response.city,
      region: response.region,
      country: response.country,
      org: response.org, // ISP
    };
  } catch (err) {
    console.error("Geo lookup failed", err);
    return null;
  }
}


export  function getUserAgentInfo(req) {
  const ua = useragent.parse(req.headers["user-agent"]);
  return {
    browser: ua.family,
    version: ua.toVersion(),
    os: ua.os.toString(),
    device: ua.device.toString(),
  };
}