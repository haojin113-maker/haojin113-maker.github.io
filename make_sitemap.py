import json
from datetime import date

# 도메인 주소 (마지막 슬래시 제외)
BASE_URL = "http://factbomber.kr"
TODAY = date.today().isoformat()

def generate_sitemap():
    try:
        # data.json 읽기
        with open('data.json', 'r', encoding='utf-8') as f:
            data = json.load(f)

        xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
        xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

        # 1. 메인 페이지 추가
        xml_content += '  <url>\n'
        xml_content += f'    <loc>{BASE_URL}/</loc>\n'
        xml_content += f'    <lastmod>{TODAY}</lastmod>\n'
        xml_content += '    <priority>1.0</priority>\n'
        xml_content += '  </url>\n'

        # 2. 서브 페이지들 추가
        for item in data:
            # url에서 맨 앞의 . 제거 (./ev/index.html -> /ev/index.html)
            clean_path = item['url'].lstrip('.')
            full_url = BASE_URL + clean_path
            
            xml_content += '  <url>\n'
            xml_content += f'    <loc>{full_url}</loc>\n'
            xml_content += f'    <lastmod>{TODAY}</lastmod>\n'
            xml_content += '    <priority>0.8</priority>\n'
            xml_content += '  </url>\n'

        xml_content += '</urlset>'

        # sitemap.xml 파일로 저장
        with open('sitemap.xml', 'w', encoding='utf-8') as f:
            f.write(xml_content)
        
        print("성공! sitemap.xml 파일이 생성되었습니다.")

    except Exception as e:
        print(f"에러 발생: {e}")

if __name__ == "__main__":
    generate_sitemap()
