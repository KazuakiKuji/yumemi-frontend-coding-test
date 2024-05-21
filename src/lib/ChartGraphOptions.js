/**
 * ファイル概要
 * グラフの初期設定を呼び生成時のアニメーションなどを管理するファイル
 * 
 * Chart.js公式サイト
 * @see - https://www.chartjs.org/docs/latest/#chart-js
 */
const options = {
    scales: {
        y: {
            title: {
                display: true, // タイトルを表示させるかどうか
                text: '人口数', // y軸のタイトル
                font: {
                    size: 20, // タイトルの大きさ
                    weight: "bolder", // フォントの太さ
                },
            },
            rotation: 90,
        },
        x: {
            title: {
                display: true,
                text: '年',
                font: {
                    size: 20
                },
            }
        }
    },
    /** animationについて @see - https://www.chartjs.org/docs/latest/configuration/animations.html#animations */
    animation: {
        duration: 1000, // アニメーションの持続時間（ミリ秒）
        easing: 'easeInOutQuart', // アニメーションのイージング関数
        onComplete: function (animation) {
            const chart = animation.chart;
            const ctx = chart.ctx;
            ctx.setLineDash([]); // ラインダッシュをリセット
        },
        onProgress: function (animation) {
            const chart = animation.chart;
            const ctx = chart.ctx;
            if (animation.animationObject) {
                ctx.save();
                ctx.setLineDash([5, 15]);
                ctx.stroke();
                ctx.restore();
            }
        },
    },
    elements: {
        line: {
            tension: 0.4, // 線のテンションを設定（0にすると直線）
        },
    },
};

export { options };
