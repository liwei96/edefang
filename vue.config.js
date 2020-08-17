module.exports = {

    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    // productionSourceMap: false,
    // 所有 webpack-dev-server 的选项都支持。
    devServer: {
        // 配置多个代理
        proxy: {
            "/pc": { 
                target: "http://39.98.227.114:9550/", // 重新映射的新地址 
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    "^/pc": "/pc" // 去掉接口地址中的api字符串
                }
            },
            "/send": { 
                target: "http://39.98.227.114:9550/", // 重新映射的新地址 
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    "^/send": "/send" // 去掉接口地址中的api字符串
                }
            },
            "/comment": { 
                target: "http://39.98.227.114:9550/", // 重新映射的新地址 
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    "^/comment": "/comment" // 去掉接口地址中的api字符串
                }
            },
            "/sure": { 
                target: "http://39.98.227.114:9550/", // 重新映射的新地址 
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    "^/sure": "/sure" // 去掉接口地址中的api字符串
                }
            },
            "/introduce": { 
                target: "http://39.98.227.114:9550/", // 重新映射的新地址 
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    "^/introduce": "/introduce" // 去掉接口地址中的api字符串
                }
            },
            "/location": { 
                target: "http://39.98.227.114:9550/", // 重新映射的新地址 
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    "^/location": "/location" // 去掉接口地址中的api字符串
                }
            },
            "/base_info": { 
                target: "http://39.98.227.114:9550/", // 重新映射的新地址 
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    "^/base_info": "/base_info" // 去掉接口地址中的api字符串
                }
            },
            "/front": { 
                target: "http://ll.edefang.net/", // 重新映射的新地址 
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    "^/front": "/front" // 去掉接口地址中的api字符串
                }
            },
            
        }
    }
};
