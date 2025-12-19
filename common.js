// common.js :: 팩트 폭격 연구소 공통 모듈

document.addEventListener("DOMContentLoaded", function() {
    
    // [1] 구글 애널리틱스 (GA4) 자동 삽입
    // ----------------------------------------------------
    const gaId = 'G-42F1L5GYBK';
    const gaScript = document.createElement("script");
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    gaScript.async = true;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', gaId);


    // [2] 구글 애드센스 자동 삽입
    // ----------------------------------------------------
    const adScript = document.createElement("script");
    adScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6902579674102145";
    adScript.async = true;
    adScript.crossOrigin = "anonymous";
    document.head.appendChild(adScript);


    // [3] 경로 계산 (메인화면 vs 서브페이지 구분)
    // ----------------------------------------------------
    // 현재 URL이 도메인 루트이거나 index.html로 끝나는데 폴더가 없는 경우 메인으로 간주
    const path = window.location.pathname;
    const isMain = path === '/' || path === '/index.html' || path.endsWith('/factbomber.kr/'); 
    
    // 메인이면 같은 폴더(./), 서브페이지면 상위 폴더(../)를 가리킴
    const rootPath = isMain ? "./" : "../";


    // [4] 상단 네비게이션 바 삽입 (body 맨 처음에 추가)
    // ----------------------------------------------------
    const navHTML = `
    <nav style="background:#212121; color:white; padding:15px 20px; border-bottom:1px solid #333; font-family:'Pretendard', sans-serif;">
        <div style="max-width:1100px; margin:0 auto; display:flex; justify-content:space-between; align-items:center;">
            <a href="${rootPath}index.html" style="color:white; text-decoration:none; font-weight:800; font-size:1.1rem; display:flex; align-items:center; gap:8px;">
                <span style="background:#c62828; padding:2px 6px; border-radius:4px; font-size:0.9rem;">FACT</span>
                BOMBER
            </a>
            <span style="font-size:0.85rem; color:#aaa; font-weight:400;">팩트 폭격 연구소</span>
        </div>
    </nav>
    `;
    document.body.insertAdjacentHTML("afterbegin", navHTML);


    // [5] 하단 '더보기' 버튼 및 푸터 삽입
    // ----------------------------------------------------
    const footerHTML = `
    <!-- 서브 페이지에서만 보이는 '다른 계산기 보기' 버튼 -->
    ${!isMain ? `
    <div style="text-align:center; margin: 60px 0 40px;">
        <a href="${rootPath}index.html" style="background:#212121; color:white; padding:15px 30px; text-decoration:none; border-radius:50px; font-weight:bold; box-shadow:0 5px 15px rgba(0,0,0,0.2); transition:0.3s; display:inline-flex; align-items:center; gap:8px;">
            🔍 다른 팩트 체크 더 보기
        </a>
    </div>
    ` : ''}

    <footer style="background:#f5f5f5; padding:40px 20px; text-align:center; color:#888; font-size:0.8rem; border-top:1px solid #eee; margin-top:50px;">
        <div style="max-width:1100px; margin:0 auto;">
            <p><strong>Fact Bomber Lab</strong> | 팩트 폭격 연구소</p>
            <p style="margin-top:10px;">본 사이트의 콘텐츠는 정보 제공을 목적으로 하며, 투자의 책임은 본인에게 있습니다.</p>
            <p>&copy; 2024 Fact Bomber. All rights reserved.</p>
        </div>
    </footer>
    `;

    document.body.insertAdjacentHTML("beforeend", footerHTML);
});
