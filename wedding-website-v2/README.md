# Wedding Website V2 — Phase 1

Project **độc lập hoàn toàn** với bản lưu trữ `longvuthanhthuy.github.io.zip`. Không chứa lại các tệp HTML/CSS/JS template gốc. Chỉ dùng bản sao được chọn lọc của 16 ảnh từ tệp người dùng cung cấp để dựng demo.

## Chạy

Yêu cầu Node.js 20.19+ hoặc 22.12+.

```bash
npm install
npm run dev
```

Mở địa chỉ terminal in ra (thường là `http://localhost:5173`).

Kiểm tra:

```bash
npm run typecheck
npm run build
npm run preview
```

## Thay nội dung

Sửa `src/weddingData.ts`, thay hình ở `public/images/`.

Hiện tại **không tự gán ngày cưới, địa điểm hoặc thông tin ngân hàng** nếu chưa xác minh. Tên cặp đôi lấy từ source gốc; phần giới thiệu, mô tả hành trình là bản thảo/demo.

## Phạm vi Phase 1

- React + TypeScript + Vite; CSS responsive, thiết kế White & Pastel Pink.
- Màn phong bì mở vào trang (tương tác cơ bản; animation mở nắp nâng cấp ở Phase 2).
- Các section giao diện: Hero, hành trình yêu thương, 4 sự kiện, RSVP, gallery và lời cảm ơn.
- Album hỗ trợ click phóng ảnh và chuyển trước/sau.
- RSVP và quà cưới có giao diện trạng thái chờ, **chưa lưu dữ liệu / chưa cung cấp QR thật**.
- Không backend, không triển khai production, không kết nối các dịch vụ ngoài trừ tải font Google Fonts.

## Phase kế tiếp

Phase 2: Nâng cấp phong bì mở ba bước có transition, hỗ trợ reduced motion và trạng thái mở phù hợp trình duyệt di động.
