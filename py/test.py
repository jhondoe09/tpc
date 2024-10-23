import os

# path = '\\172.16.2.13\htdocs\TPC-endpoint\uploads\ForRead.txt'
# path = 'E:\\Data\ForRead.txt'
# path = '//172.16.2.13/htdocs/TPC-endpoint/uploads/ForRead.txt'
path = 'C:\xampp\htdocs\TPC_VER2\frontend\assets\py\ForRead.txt'
# openfile = os.startfile(path)
readFile = open(path, 'r')
content = readFile.read()
print(f'Read File Result : {content}')
readFile.close()

print('Opening File - STart')
openFile = os.startfile(content)
print('Opening FIle - End')