/* [팩트 폭격 연구소] 통합 공통 모듈 - 광고 강제 송출 버전 */
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. 경로 및 기본 설정
    const pathArray = window.location.pathname.split('/').filter(p => p !== "");
    const isMain = pathArray.length <= 1 || window.location.pathname.endsWith('index.html') && pathArray.length === 1;
    const rootPath = isMain ? "./" : "../";

    // 2. 파비콘 및 GA4 (기존 동일)
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💣</text></svg>";
    document.head.appendChild(favicon);

    const gaId = 'G-42F1L5GYBK';
    const gaScript = document.createElement("script");
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    gaScript.async = true;
    document.head.appendChild(gaScript);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', gaId);

    // 3. 구글 애드센스 스크립트 강제 로드
    const adClient = "ca-pub-6902579674102145";
    const adSlot = "6846067145";
    const adScript = document.createElement("script");
    adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
    adScript.async = true;
    adScript.crossOrigin = "anonymous";
    document.head.appendChild(adScript);

    // 4. 상단 네비게이션 생성
    const navHTML = `
    <nav style="background:#212121; color:white; padding:15px 20px; border-bottom:1px solid #333; font-family:'Pretendard', sans-serif;">
        <div style="max-width:1100px; margin:0 auto; display:flex; justify-content:space-between; align-items:center;">
            <a href="${rootPath}index.html" style="color:white; text-decoration:none; font-weight:800; font-size:1.1rem; display:flex; align-items:center; gap:8px;">
                <span style="background:#c62828; padding:2px 6px; border-radius:4px; font-size:0.9rem;">FACT</span> BOMBER
            </a>
            <span style="font-size:0.85rem; color:#aaa; font-weight:400;">팩트 폭격 연구소</span>
        </div>
    </nav>`;
    document.body.insertAdjacentHTML("afterbegin", navHTML);

    /**
     * 5. 광고 주입 함수 (강제 실행 버전)
     */
    function forceInjectAd(targetSelector, format, uniqueId) {
        const target = document.querySelector(targetSelector);
        if (!target) return;

        // 중복 주입 방지: 내가 이미 넣은 광고(uniqueId)가 있는지 확인
        if (document.getElementById(uniqueId)) return;

        const adHTML = `
            <div id="${uniqueId}" class="fb-ad-container" style="margin:30px 0; padding:15px; background:#fff; border:1px solid #eee; border-radius:16px; text-align:center; min-height:280px;">
                <span style="font-size:10px; color:#ddd; display:block; margin-bottom:8px;">ADVERTISEMENT</span>
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="${adClient}"
                     data-ad-slot="${adSlot}"
                     data-ad-format="${format}"
                     data-full-width-responsive="true"></ins>
            </div>`;
        
        if (format === 'vertical') {
            target.insertAdjacentHTML('afterbegin', adHTML);
        } else {
            target.insertAdjacentHTML('beforeend', adHTML);
        }

        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
            console.log(`[광고 성공] ${uniqueId} 주입 완료`);
        } catch (e) {
            console.error(`[광고 실패] ${uniqueId}:`, e);
        }
    }

    // 약간의 지연을 주어 DOM이 완전히 안정된 후 주입 (미출력 방지)
    setTimeout(() => {
        forceInjectAd('.main-content', 'auto', 'main-ad-auto');
        forceInjectAd('.sidebar', 'vertical', 'side-ad-ver');
    }, 100);

    // 6. 하단 푸터 생성
    const footerHTML = `
    ${!isMain ? `
    <div style="text-align:center; margin: 60px 0 40px;">
        <a href="${rootPath}index.html" style="background:#212121; color:white; padding:15px 30px; text-decoration:none; border-radius:50px; font-weight:bold; box-shadow:0 5px 15px rgba(0,0,0,0.2); transition:0.3s; display:inline-flex; align-items:center; gap:8px;">
            🔍 다른 팩트 체크 더 보기
        </a>
    </div>` : ''}
    <footer style="background:#f5f5f5; padding:50px 20px; text-align:center; color:#888; font-size:0.85rem; border-top:1px solid #eee; margin-top:50px; line-height:1.8;">
        <div style="max-width:1100px; margin:0 auto;">
            <p style="font-size:1rem; color:#333; font-weight:bold; margin-bottom:10px;">Fact Bomber Lab | 팩트 폭격 연구소</p>
            <p>문의: <a href="mailto:helpfactbomber@gmail.com" style="color:#555;">helpfactbomber@gmail.com</a></p>
            <p style="margin-top:15px; font-size:0.8rem;">본 사이트의 콘텐츠는 정보 제공을 목적으로 하며, 투자의 책임은 본인에게 있습니다.</p>
            <p style="margin-top:20px; opacity:0.6;">&copy; 2025 Fact Bomber. All rights reserved.</p>
        </div>
    </footer>`;

    const targetForFooter = document.querySelector('.main-content') || document.body;
    targetForFooter.insertAdjacentHTML("beforeend", footerHTML);
});
