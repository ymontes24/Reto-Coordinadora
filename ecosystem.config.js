module.exports = [{
    name: 'app',
    script: './dist/index.js',
    watch: true,
    exec_mode: 'cluster',
    instances: 5,
}]