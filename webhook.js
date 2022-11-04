module.exports = () => {
    require('https').request({
        hostname: 'google.de',
        path: '/api/path/here',
    }, res => { }).end();
};