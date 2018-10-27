/**
 * IMPORTANTE, USE SUS VARIABLES DE ENTORNO PARA CONFIGURAR
 * NO SUBA NADA AL REPO
 */

var enviroment = {
    db: {
        modules: [
            'mongodb://localhost/modules'
        ]
    },
    redis: {
        url: 'redis://localhost/'
    },
    db_prefix: '594157dcd5a84a7e8fc93627_miaguila_',
    key_secret: 'key',
    url: '',
    s3url: ''
};

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
    enviroment.cache = 1;
    enviroment.db.modules = [process.env.MONGO_URL_MODULES || 'mongodb://localhost/modules'];
    enviroment.redis.url = process.env.REDIS_URL || 'redis://localhost/';
    enviroment.db_prefix = process.env.DB_PREFIX || 'prefix_miaguila_';
    enviroment.key_secret = process.env.KEY_SECRET || 'key';
    enviroment.url = process.env.URL || 'https://nido.miaguila.com';
    enviroment.s3url = process.env.S3URL || 'https://nido.miaguila.com';
}

module.exports = enviroment;