export function filterObject(_in_object: any, _filter_object: any) {

	try {
		const _filter_list = Object.keys(_filter_object);

		Object.keys(_in_object)
		.filter((_key: string) => _filter_list.includes(_key))
		.forEach((_key: string) => {
			_filter_object[_key] = _in_object[_key];
		})

		for (const key of _filter_list) {	
			if(typeof _filter_object[key] === 'function')
				_filter_object[key] = _filter_object[key]();
		}

		return _filter_object;

	} catch(e) {
		console.error(e);
		return {};
	}
}