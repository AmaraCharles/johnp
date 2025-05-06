const trendingNFTs = [
    {
        title: "Berries Art",
        image: "images/bid/4.jpg",
        creator: "@Yomnaart",
        creatorAvatar: "images/avatars/1.jpg",
        currentBid: "2.04 ETH"
    },
    {
        title: "3D Illustration",
        image: "images/bid/1.jpg",
        creator: "@Sinanart",
        creatorAvatar: "images/avatars/2.jpg",
        currentBid: "4.07 ETH"
    },
    {
        title: "Purple Leaf",
        image: "images/bid/2.jpg",
        creator: "@Yassirart",
        creatorAvatar: "images/avatars/3.jpg",
        currentBid: "1.00 ETH"
    }
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderTrendingNFTs() {
    const container = document.querySelector('.trending-auctions .row:nth-child(2)');
    if (!container) return;

    const shuffledNFTs = shuffleArray([...trendingNFTs]);
    container.innerHTML = shuffledNFTs.map(nft => `
        <div class="col-lg-4 col-md-6 item">
            <div class="nft-box">
                <div class="nft-box-thumb">
                    <a href="#0"><img class="img-fluid" src="${nft.image}" alt></a>
                    <div class="nft-box-popularity">
                        <a href="#0"><i class="fa fa-heart-o"></i></a>
                    </div>
                    <div class="nft-box-btn-content">
                        <a href="#0" class="nft-box-btn">Place a bid <i class="fa fa-arrow-right"></i></a>
                    </div>
                </div>
                <div class="nft-box-content">
                    <div class="nft-box-title-wrap d-flex align-items-center justify-content-between">
                        <h3 class="nft-box-title">
                            <a href="#0">${nft.title}</a>
                        </h3>
                        <div class="nft-box-trending-icon">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"/></svg>
                            </span>
                        </div>
                    </div>
                    <div class="nft-box-collection d-flex align-items-center justify-content-between">
                        <div class="nft-box-user d-flex align-items-center">
                            <div class="nft-box-user-thumb">
                                <img class="img-fluid" src="${nft.creatorAvatar}" alt="">
                            </div>
                            <div class="nft-box-user-name">
                                <span>Creator</span>
                                <h4>${nft.creator}</h4>
                            </div>
                        </div>
                        <div class="nft-box-price">
                            <span>Current Bid</span>
                            <h4>${nft.currentBid}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderTrendingNFTs);