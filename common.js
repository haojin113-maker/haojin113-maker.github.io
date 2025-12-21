document.addEventListener("DOMContentLoaded", function() {
    
    // =================================================================
    // [0] 경로 계산 (메인 화면 vs 서브 페이지 구분)
    // =================================================================
    // 현재 페이지가 메인(root)인지 확인합니다.
    const path = window.location.pathname;
    const isMain = path === '/' || path === '/index.html' || path.endsWith('/factbomber.kr/'); 
    
    // 메인이면 현재 폴더(./), 서브 페이지면 상위 폴더(../)를 바라보게 합니다.
    const rootPath = isMain ? "./" : "../";


    // =================================================================
    // [1] 파비콘(Favicon) & OG 태그 자동 설정
    // =================================================================
    // 1-1. 파비콘 (폭탄 이모지 💣)
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💣</text></svg>";
    document.head.appendChild(favicon);

    // 1-2. 카톡/SNS 공유용 OG 태그 자동 생성
    const metaTitle = document.querySelector("title") ? document.querySelector("title").innerText : "팩트 폭격 연구소";
    const metaDesc = document.querySelector("meta[name='description']") ? document.querySelector("meta[name='description']").getAttribute("content") : "돈과 인생의 진실을 계산해드립니다.";
    
    const metaTags = [
        { property: "og:type", content: "website" },
        { property: "og:url", content: window.location.href },
        { property: "og:title", content: metaTitle },
        { property: "og:description", content: metaDesc },
        // 대표 이미지가 있다면 아래 주소를 수정하세요. 현재는 파비콘으로 대체
        { property: "og:image", content: "https://factbomber.kr/og-image.png" } 
    ];

    metaTags.forEach(tag => {
        // 중복 방지
        if (!document.querySelector(`meta[property="${tag.property}"]`)) {
            const meta = document.createElement('meta');
            meta.setAttribute('property', tag.property);
            meta.setAttribute('content', tag.content);
            document.head.appendChild(meta);
        }
    });


    // =================================================================
    // [2] 구글 애널리틱스 (GA4) - 방문자 추적
    // =================================================================
    const gaId = 'G-42F1L5GYBK';
    const gaScript = document.createElement("script");
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    gaScript.async = true;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', gaId);


    // =================================================================
    // [3] 구글 애드센스 (광고)
    // =================================================================
    const adScript = document.createElement("script");
    adScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6902579674102145";
    adScript.async = true;
    adScript.crossOrigin = "anonymous";
    document.head.appendChild(adScript);


    // =================================================================
    // [4] 상단 네비게이션 바 (공통 헤더)
    // =================================================================
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
    // body 태그 시작 부분에 삽입
    document.body.insertAdjacentHTML("afterbegin", navHTML);


    // =================================================================
    // [5] 하단 푸터 & 더보기 버튼
    // =================================================================
    const footerHTML = `
    <!-- 서브 페이지(계산기)에서만 보이는 '다른 계산기 더보기' 버튼 -->
    ${!isMain ? `
    <div style="text-align:center; margin: 60px 0 40px;">
        <a href="${rootPath}index.html" style="background:#212121; color:white; padding:15px 30px; text-decoration:none; border-radius:50px; font-weight:bold; box-shadow:0 5px 15px rgba(0,0,0,0.2); transition:0.3s; display:inline-flex; align-items:center; gap:8px;">
            🔍 다른 팩트 체크 더 보기
        </a>
    </div>
    ` : ''}

    <footer style="background:#f5f5f5; padding:50px 20px; text-align:center; color:#888; font-size:0.85rem; border-top:1px solid #eee; margin-top:50px; line-height:1.8;">
        <div style="max-width:1100px; margin:0 auto;">
            <p style="font-size:1rem; color:#333; font-weight:bold; margin-bottom:10px;">Fact Bomber Lab | 팩트 폭격 연구소</p>
            
            <p>
                문의/제보: <a href="mailto:helpfactbomber@gmail.com" style="color:#555; text-decoration:underline; font-weight:bold;">helpfactbomber@gmail.com</a>
            </p>
            
            <p style="margin-top:15px; font-size:0.8rem;">
                본 사이트의 콘텐츠는 정보 제공을 목적으로 하며, 투자의 책임은 본인에게 있습니다.<br>
                계산 결과는 가정에 기반한 시뮬레이션으로 실제와 다를 수 있습니다.
            </p>
            
            <p style="margin-top:20px; opacity:0.6;">&copy; 2025 Fact Bomber. All rights reserved.</p>
        </div>
    </footer>
    `;

    // 레이아웃에 따라 푸터 위치 조정 (사이드바가 있는 경우 main 안에, 없으면 body 끝에)
    const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('.main-content');

    if(sidebar && main) {
        // PC 화면(사이드바 있음): 본문 끝에 푸터 추가
        main.insertAdjacentHTML("beforeend", footerHTML);
    } else {
        // 모바일 or 메인화면: 맨 밑에 추가
        document.body.insertAdjacentHTML("beforeend", footerHTML);
    }

});
