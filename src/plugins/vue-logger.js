const isProduction = process.env.NODE_ENV === 'production';

export default {
    isEnabled: true,
    logLevel : isProduction ? 'info' : 'debug',
    stringifyArguments : true,
    showLogLevel : true,
    showMethodName : false,
    separator: '|',
    showConsoleColors: true
}