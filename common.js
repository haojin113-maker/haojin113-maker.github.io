/* 수정된 common.js */
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. 경로 자동 계산 (가장 안전한 방식)
    // 현재 경로에서 슬래시(/) 개수를 세어 rootPath를 결정합니다.
    const pathArray = window.location.pathname.split('/').filter(p => p !== "");
    // GitHub Pages 특성상 레포지토리 이름이 포함될 수 있으므로 유연하게 대처
    const isMain = pathArray.length <= 1 || window.location.pathname.endsWith('index.html') && pathArray.length === 1;
    const rootPath = isMain ? "./" : "../";

    // 2. 파비콘 (즉시 실행)
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💣</text></svg>";
    document.head.appendChild(favicon);

    // 3. 구글 분석 (GA4)
    const gaId = 'G-42F1L5GYBK';
    const gaScript = document.createElement("script");
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    gaScript.async = true;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', gaId);

    // 4. 구글 애드센스 (메인 코드 로드)
    const adScript = document.createElement("script");
    adScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6902579674102145";
    adScript.async = true;
    adScript.crossOrigin = "anonymous";
    document.head.appendChild(adScript);

    // 5. 상단 네비게이션
    const navHTML = `
    <nav style="background:#212121; color:white; padding:15px 20px; border-bottom:1px solid #333; font-family:'Pretendard', sans-serif;">
        <div style="max-width:1100px; margin:0 auto; display:flex; justify-content:space-between; align-items:center;">
            <a href="${rootPath}index.html" style="color:white; text-decoration:none; font-weight:800; font-size:1.1rem; display:flex; align-items:center; gap:8px;">
                <span style="background:#c62828; padding:2px 6px; border-radius:4px; font-size:0.9rem;">FACT</span>
                BOMBER
            </a>
            <span style="font-size:0.85rem; color:#aaa; font-weight:400;">팩트 폭격 연구소</span>
        </div>
    </nav>`;
    document.body.insertAdjacentHTML("afterbegin", navHTML);

    // 6. 하단 푸터 (버그 수정: rootPath 적용)
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

    // 사이드바 유무에 따른 푸터 삽입 위치 결정 로직 강화
    const mainContent = document.querySelector('.main-content') || document.body;
    mainContent.insertAdjacentHTML("beforeend", footerHTML);
});
