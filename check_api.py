import urllib.request
import re

try:
    html = urllib.request.urlopen('https://carboniq-one.vercel.app/dashboard').read().decode('utf-8')
    # Search for compiled JS files
    js_files = re.findall(r'src="([^"]+\.js)"', html)
    print("Found JS files:", js_files)
    
    # We could fetch the JS files and search for the API URL, but let's just see if we can find it in html first
    matches = re.findall(r'http[s]?://[^\s"\'`]+', html)
    for m in set(matches):
        if 'api' in m or '8000' in m or 'render' in m or 'vercel' in m:
            print("URL in HTML:", m)
            
except Exception as e:
    print("Error:", e)
