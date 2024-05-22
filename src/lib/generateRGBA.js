/**
 * ファイル概要
 * グラフ生成時の色情報を定義するための関数が定義されるファイル
 */

let lastColor = null;
/**
 * ランダムなRGBA形式の色を生成する関数
 * 前回生成された色と100以上の距離がある色を生成します
 * ※最後に選択した色と似ることが無いようにするための設計
 * @returns {string} - RGBA形式の色情報
 */
const generateRGBA = () => {
    let r, g, b;
    do {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    } while (lastColor && colorDistance([r, g, b], lastColor) < 100);

    lastColor = [r, g, b];
    const a = 1;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * 2つの色の距離を計算する関数
 * RGB色空間におけるユークリッド距離を使用します
 * @param {number[]} color1 - RGB形式の色配列 [r, g, b]
 * @param {number[]} color2 - RGB形式の色配列 [r, g, b]
 * @returns {number} - 2つの色の距離
 */
const colorDistance = (color1, color2) => {
    return Math.sqrt(
        Math.pow(color1[0] - color2[0], 2) +
        Math.pow(color1[1] - color2[1], 2) +
        Math.pow(color1[2] - color2[2], 2)
    );
}


export default generateRGBA;