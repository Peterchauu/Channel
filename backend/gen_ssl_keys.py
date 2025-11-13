import subprocess
import os

def generate_certificate():
    
    cert_directory = os.path.join(os.path.dirname(__file__))
    os.makedirs(cert_directory, exist_ok=True)
    
    cert_file = os.path.join(cert_directory, 'server.crt')
    key_file = os.path.join(cert_directory, 'server.key')
    
    # create a key using windows built-in powershell
    cmd = [
        'openssl', 'req', '-x509',
        '-newkey', 'rsa:4096',
        '-keyout', key_file,
        '-out', cert_file,
        '-days', '365',
        '-nodes', 
        '-subj', '/CN=localhost/O=ChannelApp/C=US'
    ]
    
    
    
    