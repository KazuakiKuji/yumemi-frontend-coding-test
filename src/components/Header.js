import React from 'react';

export default function Header() {
    return (
        <header className="header bg-primary text-white shadow-sm">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center px-4">
                    <h1 className="m-0">都道府県別の総人口推移グラフ表示アプリ</h1>
                </div>
            </div>
        </header>
    );
}
