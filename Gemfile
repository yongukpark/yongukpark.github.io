source "https://rubygems.org"

# === 로컬 개발/빌드 (권장, Jekyll 4.x) ===
# 최신 Jekyll 기능 + 빠른 로컬 빌드. `bundle exec jekyll serve`로 미리보기.
gem "jekyll", "~> 4.3"

# === Jekyll 플러그인 (GitHub Pages 화이트리스트) ===
# SEO 태그, 사이트맵, RSS/Atom 피드. _config.yml의 plugins 목록과 일치.
group :jekyll_plugins do
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-feed"
end

# === GitHub Pages 배포 대안 ===
# GitHub Pages가 서버에서 직접 빌드하도록 하려면 위 jekyll 대신 아래를 사용:
#   gem "github-pages", group: :jekyll_plugins
# 주의: github-pages gem은 Jekyll 3.x 계열에 고정되며 사용 가능한 plugin이 제한된다.
# 이 사이트는 plugin에 의존하지 않으므로 두 방식 모두 동일하게 빌드된다.
# (GitHub Pages는 저장소를 push하면 자동 빌드하므로, 정적 산출물을 직접 올릴 필요는 없다.)

# Windows / JRuby 등에서 tzinfo 필요 시:
platforms = %i[mingw mswin x64_mingw jruby]
gem "tzinfo", ">= 1", "< 3", platforms: platforms
gem "tzinfo-data", platforms: platforms
gem "wdm", "~> 0.1.1", platforms: %i[mingw mswin x64_mingw]
