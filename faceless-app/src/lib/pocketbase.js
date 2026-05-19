import PocketBase from 'pocketbase';

// Địa chỉ PocketBase Server (sẽ lấy từ biến môi trường NEXT_PUBLIC_POCKETBASE_URL, mặc định là http://127.0.0.1:8090)
const pbUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';

// Khởi tạo connection với PocketBase
export const pb = new PocketBase(pbUrl);

// (Tùy chọn) Có thể tắt tính năng auto cancellation nếu bạn muốn các request giống nhau có thể gửi đi đồng thời
pb.autoCancellation(false);

export default pb;
