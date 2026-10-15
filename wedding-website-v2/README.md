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

## Phase 1.1 — Visual rebuild

Bản này bổ sung artwork phong bì/dấu sáp có chất liệu, botanical SVG, timeline Bézier desktop/mobile, ba nhóm thông tin và gallery editorial. Giữ nguyên dữ liệu và trạng thái RSVP/quà cưới từ Phase 1.

Mở thiệp có dissolve và hero xuất hiện tuần tự; các khối hiện nhẹ khi cuộn. Tôn trọng `prefers-reduced-motion`. Chi tiết đối chiếu, các giới hạn và ảnh kiểm chứng nằm trong `docs/phase-1.1-visual-review.md` và `screenshots/`.

Sau khi pull code mới, chạy:

```bash
npm ci
npm run dev
```

Nếu dev server đang chạy bản cũ, dừng bằng Ctrl+C rồi chạy lại. File `src/vite-env.d.ts` cung cấp khai báo kiểu Vite cho CSS import.
