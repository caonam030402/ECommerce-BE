# RESTful API Ecommerce

## Quick Start

To create a project, simply run:

## Manual Installation

Clone the repo:

```bash
git clone https://github.com/caonam030402/ECommerce-RestApi-NodeJs.git
```

Install the dependencies:

```bash
npm install
```

## Commands

Running locally:

```bash
npm run dev
```

Linting:

```bash
# run ESLint
npm run lint

# fix ESLint errors
npm run lint:fix

# run prettier
npm run prettier

# fix prettier errors
npm run prettier:fix
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
URL_MONGOOSE =
ACCESS_TOKEN_SECRET =
REFRESH_TOKEN_SECRET =
ACCESS_TOKEN_EXPIRES_IN =
REFRESH_TOKEN_EXPIRES_IN =
PORT =

# KEY PAYMENT VNPAY
vnp_TmnCode =
vnp_HashSecret =
vnp_Url =
vnp_ReturnUrl =
```

## API Documentation

### Register: `/v1/register`

Method: POST
body

```json
{
  "email": "caonam81@gmail.com",
  "password": "caonam123"
}
```

Response

```json
{
  "message": "Đăng kí thành công",
  "data": {
    "user": {
      "email": "caonam81@gmail.com",
      "roles": [],
      "_id": "6499a8a72504fe6e4cf9b8fc",
      "createdAt": "2023-06-26T15:03:03.964Z",
      "updatedAt": "2023-06-26T15:03:03.964Z",
      "__v": 0
    },
    "access_token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDk5YThhNzI1MDRmZTZlNGNmOWI4ZmMiLCJpYXQiOjE2ODc3OTE3ODQsImV4cCI6MTY4Nzc5MTgxNH0.Uk_tVLpk-7eNqTUKzz6VIQuhfgc69-Iyy9VkQbRda5A",
    "refresh_token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDk5YThhNzI1MDRmZTZlNGNmOWI4ZmMiLCJpYXQiOjE2ODc3OTE3ODQsImV4cCI6MTY4NzgyNzc4NH0.G1FSWF0BVQLJH73m-Zh6cOylJBxdx3VAjYM4jfKcLTg",
    "expires": "1h",
    "expires_refresh_token": "10h"
  }
}
```

### Login: `/v1/login`

Method: POST
body

```json
{
  "email": "caonam81@gmail.com",
  "password": "caonam123"
}
```

Response

```json
{
  "message": "Đăng nhập thành công",
  "data": {
    "access_token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDk5YTEzMzEyZjMxZTJlYzQwMDJiY2IiLCJpYXQiOjE2ODc3OTE2OTMsImV4cCI6MTY4Nzc5MTcyM30.-xEMR2rF7SXZB0x4bD-qaYwNjvwQNVoSEa6FF6DJsxA",
    "expires": "2h",
    "refresh_token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDk5YTEzMzEyZjMxZTJlYzQwMDJiY2IiLCJpYXQiOjE2ODc3OTE2OTMsImV4cCI6MTY4NzgyNzY5M30.lLIpGK8U3KPlwU4ngaqUxNw7sq3zMVWKqMyJ6Dz3Ln8",
    "expires_refresh_token": "10h",
    "user": {
      "_id": "6499a13312f31e2ec4002bcb",
      "email": "caonam81@gmail.com",
      "roles": [],
      "createdAt": "2023-06-26T14:31:15.457Z",
      "updatedAt": "2023-06-26T14:31:15.457Z",
      "__v": 0
    }
  }
}
```

### Logout: `/v1/logout`

Method: POST
header

```json
{
  "access_token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDk5YTEzMzEyZjMxZTJlYzQwMDJiY2IiLCJpYXQiOjE2ODc3OTE2OTMsImV4cCI6MTY4Nzc5MTcyM30.-xEMR2rF7SXZB0x4bD-qaYwNjvwQNVoSEa6FF6DJsxA"
}
```

Response

```json
{
  "message": "Đăng xuất thành công"
}
```

### Get Profile: `/v1/me`

Method: GET
header

```json
{
  "access_token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDk5YTEzMzEyZjMxZTJlYzQwMDJiY2IiLCJpYXQiOjE2ODc3OTE2OTMsImV4cCI6MTY4Nzc5MTcyM30.-xEMR2rF7SXZB0x4bD-qaYwNjvwQNVoSEa6FF6DJsxA"
}
```

Response

```json
{
  "message": "Lấy người dùng thành công",
  "data": {
    "_id": "6499a13312f31e2ec4002bcb",
    "email": "caonam811@gmail.com",
    "roles": [],
    "createdAt": "2023-06-26T14:31:15.457Z",
    "updatedAt": "2023-06-26T14:31:15.457Z",
    "__v": 0
  }
}
```

### Update Profile: `/v1/user`

Method: PUT
body

```json
{
  "name": "caonam",
  "password": "caonam",
  "address": "Da Nang, Viet Nam",
  "phoneNumber": "0382714916",
  "new_password": "Naonam32323@"
}
```

Response

```json
{
  "message": "Cập nhập người dùng thành công",
  "data": {
    "_id": "6499a13312f31e2ec4002bcb",
    "email": "caonam811@gmail.com",
    "address": "Da Nang, Viet Nam",
    "roles": [],
    "createdAt": "2023-06-26T14:31:15.457Z",
    "updatedAt": "2023-06-26T15:14:07.819Z",
    "__v": 0,
    "name": "caonam"
  }
}
```

### Upload Avatar: `/v1/user/upload-avatar`

Method: POST
form-data

Response

```json
{
  "message": "Upload ảnh đại diện thành công",
  "data": "avatar-1687793282939-639104443.png"
}
```

### Get Address: `/v1/address`

Method: GET

Response

```json
{
  "message": "Lấy địa chỉ thành công",
  "data": [
    {
      "_id": "6482952f4744efbce8dc2e4f",
      "Id": "01",
      "Name": "Thành phố Hà Nội",
      "Districts": [
        {
          "_id": "6499aee4ec3124d01fa8d8fb",
          "Id": "001",
          "Name": "Quận Ba Đình",
          "Wards": [
            {
              "Id": "00031",
              "Name": "Phường Giảng Võ",
              "Level": "Phường"
            },
            {
              "Id": "00034",
              "Name": "Phường Thành Công",
              "Level": "Phường"
            }
          ]
        }
      ]
    }
  ]
}
```

### Get Products: `/v1/products`

For example: `products?page=1&limit=30`
Method: GET

Query Params:

- `page`: number. Number of pages. Default is 1
- `limit`: number. Number of products per page. Default is 30
- `order`: 'desc' || 'asc'. Sort by order. Default is 'desc'
- `sort_by`: 'createdAt' || 'view' || 'sold' || 'price'. Sort by field. Default is 'createdAt'.
- `category`: categoryId. Filter products by category
- `exclude`: productId. Exclude certain products
- `rating_filter`: number. Filter products with stars greater than or equal to rating_filter
- `price_max`: number. Highest price
- `price_min`: number. Lowest price
- `name`: string. Product Name (Note: Vietnamese product name must be filled with punctuation marks)

Response

```json
{
  "message": "Lấy các sản phẩm thành công",
  "data": {
    "products": [],
    "pagination": {
      "page": 1,
      "limit": 30,
      "page_size": 2
    }
  }
}
```

### Add Products: `/v1/products/add-product`

Method: POST
body

```json
[
  {
    "_id": "60afb2426ef5b902180aacb9",
    "images": ["url_1", "url_2", "url_3", "url_4", "url_5"],
    "price": 2590000,
    "price_before_discount": 3490000,
    "quantity": 73,
    "sold": 6800,
    "view": 17527,
    "name": "Điện thoại iphone 14",
    "category": {
      "_id": "60afafe76ef5b902180aacb5",
      "name": "Điện thoại"
    },
    "image": "url_1"
  }
]
```

Response

```json
{
  "message": "Thêm sản phẩm thành công thành công",
  "data": [
    {
      "_id": "60afb2426ef5b902180aacb9",
      "images": ["url_1", "url_2", "url_3", "url_4", "url_5"],
      "price": 2590000,
      "price_before_discount": 3490000,
      "quantity": 73,
      "sold": 6800,
      "view": 17527,
      "name": "Điện thoại iphone 14",
      "category": {
        "_id": "60afafe76ef5b902180aacb5",
        "name": "Điện thoại"
      },
      "image": "url_1"
    }
  ]
}
```

### Update Product: `/v1/products/update-product`

Method: PUT
body

```json
{
  "_id": "60afb2426ef5b902180aacb9",
  "images": ["url_1", "url_2", "url_3", "url_4", "url_5"],
  "price": 2590000,
  "price_before_discount": 3490000,
  "quantity": 73,
  "sold": 6800,
  "view": 17527,
  "name": "Điện thoại iphone 14",
  "category": {
    "_id": "60afafe76ef5b902180aacb5",
    "name": "Điện thoại"
  },
  "image": "url_1"
}
```

Response

```json
{
  "message": "Cập nhập sản phẩm công",
  "data": {
    "_id": "60afb2426ef5b902180aacb9",
    "images": ["url_1", "url_2", "url_3", "url_4", "url_5"],
    "price": 2590000,
    "price_before_discount": 3490000,
    "quantity": 73,
    "sold": 6800,
    "view": 17527,
    "name": "Điện thoại iphone 14",
    "category": {
      "_id": "60afafe76ef5b902180aacb5",
      "name": "Điện thoại"
    },
    "image": "url_1"
  }
}
```

### Delete Product `v1/product/delete-product:_id`

For example: `v1/products/delete-product/6474d5ee11873c33396abb62`

Method: DELETE

Response

```json
{
  "success": true,
  "message": "Xóa sản phẩm thành công"
}
```

### Get ProductDetail `v1/products/:_id`

For example: `v1/products/6460a53fcf48dd81cc4c635a`

Method: GET

Response

```json
{
  "message": "Lấy sản phẩm thành công",
  "data": {
    "_id": "60afb2426ef5b902180aacb9",
    "images": ["url_1", "url_2", "url_3", "url_4", "url_5"],
    "price": 2590000,
    "price_before_discount": 3490000,
    "quantity": 73,
    "sold": 6800,
    "view": 17527,
    "name": "Điện thoại iphone 14",
    "category": {
      "_id": "60afafe76ef5b902180aacb5",
      "name": "Điện thoại"
    },
    "image": "url_1"
  }
}
```

### Add Category `v1/categories/add-category`

Method: POST
body

```json
[
  {
    "_id": "60aba4e24efcc70f8892e1c6",
    "name": "Áo thun"
  },
  {
    "_id": "60afacca6ef5b902180aacaf",
    "name": "Đồng hồ"
  },
  {
    "_id": "60afafe76ef5b902180aacb5",
    "name": "Điện thoại"
  }
]
```

Response

```json
{
  "message": "Thêm danh mục thành công",
  "data": [
    {
      "_id": "60aba4e24efcc70f8892e1c6",
      "name": "Áo thun"
    },
    {
      "_id": "60afacca6ef5b902180aacaf",
      "name": "Đồng hồ"
    },
    {
      "_id": "60afafe76ef5b902180aacb5",
      "name": "Điện thoại"
    }
  ]
}
```

### Get Category `/v1/categories`

Method: GET

Response

```json
{
  "message": "Thêm danh mục thành công",
  "data": [
    {
      "_id": "60aba4e24efcc70f8892e1c6",
      "name": "Áo thun",
      "createdAt": "2023-05-20T10:08:07.483Z",
      "updatedAt": "2023-05-20T10:08:07.483Z",
      "__v": 0
    },
    {
      "_id": "60afacca6ef5b902180aacaf",
      "name": "Đồng hồ",
      "createdAt": "2023-05-20T10:08:07.483Z",
      "updatedAt": "2023-05-20T10:08:07.483Z",
      "__v": 0
    },
    {
      "_id": "60afafe76ef5b902180aacb5",
      "name": "Điện thoại",
      "createdAt": "2023-05-20T10:08:07.483Z",
      "updatedAt": "2023-05-20T10:08:07.483Z",
      "__v": 0
    }
  ]
}
```

### Buy Products `v1/purchases/buy-products`

Method: POST
body

```json
[{ "purchase_id": "6464f0b4b2ffb6c7f8b470d8" }, { "purchase_id": "6464f6a1e244cb8190cc4c93" }]
```

Response

```json
{
  "message": "Mua thành công",
  "data": {}
}
```

### Update Purchase `/v1/update-purchase`

Method: POST
body

```json
{ "status": -1, "buy_count": 2 }
```

### Buy Products `v1/purchases/buy-products`

Method: POST
body

```json
[{ "purchase_id": "6464f0b4b2ffb6c7f8b470d8" }, { "purchase_id": "6464f6a1e244cb8190cc4c93" }]
```

Response

```json
{
  "message": "Mua thành công",
  "data": {}
}
```

### Add To Cart `v1/purchases/add-to-cart`

Method: POST
body

```json
{
  "product_id": "60afaf286ef5b902180aacb3",
  "buy_count": 2
}
```

Response

```json
{
  "message": "Thêm sản phẩm vào giỏ hàng thành công",
  "data": {
    "buy_count": 2,
    "price": 300000,
    "price_before_discount": 450000,
    "status": -1,
    "user": "6499a13312f31e2ec4002bcb",
    "product": {
      "message": "Lấy sản phẩm thành công",
      "data": {
        "_id": "60afb2426ef5b902180aacb9",
        "images": ["url_1", "url_2", "url_3", "url_4", "url_5"],
        "price": 2590000,
        "price_before_discount": 3490000,
        "quantity": 73,
        "sold": 6800,
        "view": 17527,
        "name": "Điện thoại iphone 14",
        "category": {
          "_id": "60afafe76ef5b902180aacb5",
          "name": "Điện thoại"
        },
        "image": "url_1"
      }
    },
    "_id": "6499b4deec3124d01fa8dbd4",
    "createdAt": "2023-06-26T15:55:10.600Z",
    "updatedAt": "2023-06-26T15:55:10.600Z",
    "__v": 0
  }
}
```

### Cancel Purchase Order `v1/purchases/add-to-cart`

Method: DELETE
body

```json
["6464f025b2ffb6c7f8b4706e", "6464f027b2ffb6c7f8b47078"]
```

Response

```json
{
  "message": "Hủy đơn thành công"
}
```

## Get Purchases: `/purchases`

For example: `user/purchase/?status=1`

Method: GET
Query Params:
`status`: Order Status

Info `status`:

- -1: Product is in cart
- 0: All products
- 1: The product is waiting for confirmation from the shop owner
- 2: Products are being picked up
- 3: Products are in transit
- 4: The product has been delivered
- 5: Product has been canceled

### Dashboard Quanlity Overview: `v1/dashboard/quanlity-overview`

Method: GET

Response

```json
{
  "message": "Lấy thông tin tổng quan thành công",
  "data": {
    "totalAmoutSold": {
      "_id": null,
      "total": 16104000
    },
    "totalProduct": {
      "_id": null,
      "total": 118005
    },
    "totalProductSold": {
      "_id": null,
      "total": 16
    },
    "totalUser": {
      "_id": null,
      "total": 42
    }
  }
}
```

### Create URL Payment: `payment/create_payment_url`

Method: POST
body

```json
{
  "amount": 20000,
  "bankCode": "",
  "language": "vn"
}
```

Response

```json
{
  "message": "Lấy URL thành công",
  "data": "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=2000000&vnp_Command=pay&vnp_CreateDate=20230626210008&vnp_CurrCode=VND&vnp_IpAddr=%3A%3A1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+cho+ma+GD%3A26210008&vnp_OrderType=other&vnp_ReturnUrl=http%3A%2F%2Flocalhost%3A8888%2Forder%2Fvnpay_return&vnp_TmnCode=QV0U7DIY&vnp_TxnRef=26210008&vnp_Version=2.1.0&vnp_SecureHash=ff1c27c4b8b1934b826004020828341248674b38a27fa6fa4251320d25059253bb0b65105b64134576bd219aadad46d42e29908947ffb6761683052e10213a71"
}
```

### Get Image: `/v1/images/:filename`

For example: `/v1/images/image-1684460733977-638357616.png`

Method: GET

### Refrest Token: `V1/refresh-token`

Method: POST
body

```json
{
  "refresh_token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDkxMWMwYzViYTYzYjQ4MWYxZWRlOTAiLCJpYXQiOjE2ODcyNTY2MDQsImV4cCI6MTY4NzI2MDIwNH0.NU1iKylj_XmkPry9ziNM9DzbyIf3KF_kjMMmzU8AgkU"
}
```
