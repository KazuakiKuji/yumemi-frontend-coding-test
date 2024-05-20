/**
 * ■ファイル概要
 * フェッチを行う関数を定義したファイル
 */

const API = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_KEY
    : undefined

if (API === undefined) {
    throw new Error("セットされていません：REACT_APP_API_KEY")
}

console.log("API", API)

export default function fetcher() {
    
}

// export const createRequest = (resource, init) => {
//     const input =
//         API && API.match(/https?:\/\//i)
//             ? `${API}${resource}`
//             : resource;

//     console.log("input", input)
//     const headers = new Headers({
//         ...init?.headers,
//         "content-type": "application/json",
//     });

//     if (API && process.env.REACT_APP_API_KEY) {
//         headers.append("X-API-KEY", process.env.REACT_APP_API_KEY);
//     }

//     const request = new Request(input, { ...init, headers });

//     console.log("process.env.NODE_ENV", process.env.NODE_ENV)
//     if (process.env.NODE_ENV === "development") {
//         console.log("[FETCH]", { request });
//     }

//     return request;
// };


// export const fetcher = (resource, init) =>
//     fetch(createRequest(resource, init))
//         .then((response) => {
//             if (process.env.NODE_ENV === "development") {
//                 console.log("[FETCH RESPONSE]", { response });
//             }
//             return response.json();
//         })
//         .catch((error) => {
//             if (process.env.NODE_ENV === "development") {
//                 console.error("[FETCH ERROR]", { error });
//             }
//             throw error;
//         });
