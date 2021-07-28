<script>
	export default {
		data() {
			return {
				filterData: [
					{
						name:'全部分类',
						type: "hierarchy",
						submenu: [
							{
								name: '全部分类',
								value: "全部分类",
								submenu: [
									{
										name: "麻辣香锅",
										value: '11',
									},
									{
										name: "汉堡店",
										value: '12',
									}
								]
							},
							{
								name: '游戏玩乐',
								value: "游戏玩乐",
								submenu: [
									{
										name: "团建拓展",
										value: "333"
									},
									{
										name: "游戏电玩",
										value: "444"
									}
								]
							}
						],
					},
					{
						name:'智能排序',
						type: "hierarchy",
						submenu: [{
							name: "综合排序",
							value: "1",
						},{
							name: "距离最近",
							value: "2",
						},{
							name: "销量最高",
							value: "3",
						}],
					},
					{
						name:'全部筛选',
						type: "filter",
						submenu: [{
							name: '支持服务',
							type: "asd",
							submenu: [
								{
									name: "支持堂食",
									value: '100'
								},
								{
									name: "支持自提",
									value: '200'
								},
							]
						}],
					},
				]
			}
		},
		methods: {
			
		}
	}
</script>
