export const timeAgo = (isoString: string) => {
    const now = new Date();
    const created = new Date(isoString);
    const diffSec = Math.floor((now.getTime() - created.getTime()) / 1000); // 차이(초)

    if (diffSec < 60) return "방금 전";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}분 전`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}시간 전`;
    if (diffSec < 2592000) return `${Math.floor(diffSec / 86400)}일 전`; // 30일
    if (diffSec < 31104000) return `${Math.floor(diffSec / 2592000)}개월 전`; // 12달
    return `${Math.floor(diffSec / 31104000)}년 전`;
}