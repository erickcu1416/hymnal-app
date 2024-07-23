module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
			'react-native-reanimated/plugin',
			[
				'module:react-native-dotenv',
				{
					moduleName: '@env',
					path: '.env',
					blacklist: null,
					whitelist: null,
					safe: false,
					allowUndefined: true
				}
			],
			[
				'module-resolver',
				{
					root: ['./'],
					alias: {
						'@components': './components',
						'@utils': './utils',
						'@context': './context',
						'@hooks': './hooks',
						'@navigation': './navigation',
						'@pages': './pages',
						'@theme': './theme',
						'@assets': './assets',
						'@store': './store'
					}
				}
			]
		]
  };
};
