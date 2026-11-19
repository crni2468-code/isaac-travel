import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL(".", import.meta.url));
const types = {".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".webp":"image/webp",".jpg":"image/jpeg",".jpeg":"image/jpeg",".xml":"application/xml; charset=utf-8",".txt":"text/plain; charset=utf-8"};
createServer(async (req,res)=>{
 try {
  const pathname=decodeURIComponent(new URL(req.url||"/","http://localhost").pathname);
  const safe=normalize(pathname).replace(/^([.][.][/\\\\])+/, "").replace(/^[/\\\\]+/, "");
  let file=join(root,safe||"index.html");
  if(!file.startsWith(root)) throw new Error("Invalid path");
  try{if((await stat(file)).isDirectory())file=join(file,"index.html");}catch{if(!extname(file))file=join(root,"index.html");}
  const body=await readFile(file);
  res.writeHead(200,{"content-type":types[extname(file)]||"application/octet-stream","x-content-type-options":"nosniff","cache-control":file.endsWith("index.html")?"public, max-age=60":"public, max-age=86400"});
  res.end(body);
 }catch{res.writeHead(404,{"content-type":"text/plain; charset=utf-8"});res.end("Not found");}
}).listen(Number(process.env.PORT||3000),"0.0.0.0",()=>console.log("Ron Gal salon server ready"));
