import requests

# Replace 'http://your_server_address/your_file_path' with the actual URL of your file
file_url = 'http://your_server_address/your_file_path'

try:
    response = requests.get(file_url)
    response.raise_for_status()  # Check for errors
    content = response.content

    # Now you can do something with the file content, for example, print it
    print(content.decode('utf-8'))

except requests.exceptions.RequestException as e:
    print(f"Error: {e}")