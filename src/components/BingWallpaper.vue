<script>
import axios from 'axios';
export default {
    data() {
        return {
            bingImageUrl: '',
            imgTitle: '',
            imgCopyright: '',
            imgStyle: {
                opacity: 0,
                filter: 'blur(20px)',
                transform: 'scale(0.95)',
                borderRadius: '80px'
            },
            idx: 0,
            n: 1,
        };
    },
    methods: {
        getBingImage() {
            var url = "/bing" + "&idx=" + this.idx + "&n=" + this.n;
            axios.get(url)
                .then(response => {
                    const images = response.data.images;
                    if (images.length > 0) {
                        this.bingImageUrl = 'https://www.bing.com' + images[0].url;
                        this.imgCopyright = images[0].copyright;
                        this.imgTitle = images[0].title;
                        this.date = images[0].date;
                    }
                })
                .catch(error => {
                    console.error('请求Bing API出错:', error);
                });
        },
        imgLoaded() {
            // 图片加载完成后，将透明度设置为1
            this.imgStyle.opacity = 1;
            this.imgStyle.filter = 'blur(0px)';
            this.imgStyle.transform = 'scale(1)';
            this.imgStyle.borderRadius = '0';
            // alert("load!")
        },
        trace() {
            if (this.idx == 7) {
                alert("已经是最后一张啦!");
                this.imgStyle.filter = 'blur(30px)';
                this.imgStyle.opacity = 0;
                this.idx = 0;
                this.getBingImage();
                return;
            }
            this.imgStyle.filter = 'blur(30px)';
            this.imgStyle.opacity = 0;
            this.idx++;
            this.getBingImage();
        }
    },
    created() {
        this.getBingImage(); // 组件创建完成后获取Bing图片
    }
};
</script>


// Vue组件
<template>
    <div class="container">
        <div class="content">
            <h1>{{ imgTitle }}</h1>
            <p>{{ imgCopyright }}</p>
            <p class="info" v-if="idx == 0">今日 来自每日Bing</p>
            <p class="info" v-if="idx > 0">{{ idx }} 天前 来自每日Bing</p>
            <button class="glowButton" @click="trace">回溯</button>
        </div>
        <img @load="imgLoaded" :style="imgStyle" :src="bingImageUrl" alt="Bing Daily" />
    </div>
</template>

<style>
:root {
    --opacity: 0.8;
}

.container {
    background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%);
    display: flex;
    flex-direction: column;
    color: white;
    min-height: 100vh;
    /* align-items: center; */
    justify-content: flex-end;
}

.content {
    margin: 40px 60px 80px 60px;
}

.info {
    font-size: small;
    margin-top: 10px;
    width: fit-content;
    backdrop-filter: blur(var(--border-blur));
    box-shadow: 0px 0px 20px 5px var(--shadow-color);
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: var(--glow-button-bg);
    border-radius: 20px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 4px;
    padding-bottom: 4px;
    text-align: center;
}

img {
    object-fit: cover;
    position: fixed;
    z-index: -3;
    width: 100%;
    height: 100%;
    transition: 0.8s;
}

h1 {
    font-size: xx-large;
    font-weight: 100;
    opacity: var(--opacity);
}

p {
    font-size: larger;
    font-weight: 100;
}

@media only screen and (max-width: 767px) {
    h1 {
        font-size: large;
        font-weight: 100;
    }

    p {
        font-size: small;
        font-weight: 100;
    }
}
</style>
