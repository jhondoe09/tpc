import requests

# HTTP server details
http_server = "http://example.com/path/to/your/files"
file_name = "example.txt"

# Make an HTTP request to get the file content
response = requests.get(f"{http_server}/{file_name}")

# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Print the content
    print(response.text)
else:
    print(f"Failed to fetch file. Status code: {response.status_code}")
    print(response.text)