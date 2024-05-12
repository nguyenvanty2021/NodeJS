Các bước tạo public_key từ private_key sử dụng thuật toán RSA thông qua openSSL:

- Sử dụng lệnh sau để tạo cặp khóa RSA:
  Bước 1: openssl genpkey -algorithm RSA -out private_key.pem
  Lệnh này sẽ tạo một khóa riêng tư và lưu trữ nó trong tệp private_key.pem.
- Sử dụng private key vừa tạo để tạo public key:
  Bước 2: openssl rsa -pubout -in private_key.pem -out public_key.pem
  Lệnh này sẽ tạo một khóa công khai và lưu trữ nó trong tệp public_key.pem.

=> private_key giống như là ổ khóa, public_key giống như là chìa khóa. Một ổ khóa có thể có nhiều chìa khóa (1 private_key có thể có nhiều public_key)
