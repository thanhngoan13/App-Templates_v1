import telnetlib
import time
import sys
import os.path, re, ftplib, csv
import shutil, glob, datetime
import pyodbc 
from datetime import datetime

## get ngay gio
now = datetime.now() 
# dd/mm/YY H:M:S
new_date_time = now.strftime("%d/%m/%Y %H:%M:%S")


#ham telet OLT 

def TelnetOLTALU (ip, lenh):
    tn = telnetlib.Telnet(ip,timeout=10) 
    tn.read_until(b'login: ')
    tn.write(b'isadmin\n')
   
    tn.read_until(b'password: ')
    tn.write(b'ANS#150vtkg\n')

    tn.read_until(b"# ")

    tn.write(lenh)
    #time.sleep(1)
    string_data ='';
    #result_telnet =tn.read_very_eager().decode('ascii','replace')
    while True:
      line = tn.read_until(b"\n") # Read one line
      
      data = line.decode(encoding='UTF-8',errors='strict')
      
      
      string_data = string_data +data 
      print(data)
      if b'># ' in line:  # last line, no more read
          break
    #print(string_data)
    #print(data)
   
    #return result_telnet


ip = sys.argv[1]
#TelnetOLTALU('10.95.54.23',b'info configure equipment ont interface 1/1/1/1/1\n')
lenhFromNode =sys.argv[2]

TelnetOLTALU(ip,lenhFromNode.encode('ascii') + b"\n")

#print('show dong bo \n'+result_data)
#print('\nshow mac \n'+result_data2)

 
#print("IP: " + sys.argv[1]) 
#print("\rLenh: " + sys.argv[2]) 

   
    

    
   
  

   
    


