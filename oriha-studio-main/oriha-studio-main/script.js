// 画面のスクロールを検知して要素をふわっと表示させる機能（IntersectionObserver）
document.addEventListener("DOMContentLoaded", function () {
    
    // 対象にする要素（CSSで .section-fade をつけたところ）をすべて取得
    const fadeElements = document.querySelectorAll(".section-fade");

    // オプション設定：要素が画面の30%（0.3）に入ったら発動させる
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3
    };

    // 画面に入ったときの処理
    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            // 要素が画面内に入ったら
            if (entry.isIntersecting) {
                // CSSの 'is-visible' クラスを追加してアニメーションを実行
                entry.target.classList.add("is-visible");
                // 一度表示されたら監視を終了する（何度もアニメーションさせないため）
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // すべてのフェードイン対象要素の監視を開始
    fadeElements.forEach(el => {
        observer.observe(el);
    });
});