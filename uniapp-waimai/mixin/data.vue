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
										name:'快餐小吃',
										value: '快餐小吃',
										submenu: [
											{
												name: '麻辣香锅',
												value: '麻辣香锅'
											},
											{
												name: '西式快餐',
												value: '西式快餐'
											},
											{
												name: '中式快餐',
												value: '中式快餐'
											},
											{
												name: '熟食',
												value: '熟食'
											},
											{
												name: '面馆面食',
												value: '面馆面食'
											},
											{
												name: '米粉米线',
												value: '米粉米线'
											},
											{
												name: '地方小吃',
												value: '地方小吃'
											},
											{
												name: '汤',
												value: '汤'
											},
											{
												name: '麻辣烫',
												value: '麻辣烫'
											},
											{
												name: '素食轻餐',
												value: '素食轻餐'
											},
										]
									}
								]
							},
							{
								name: '游戏玩乐',
								value: "游戏玩乐",
								submenu: [
									{
										name: "团建拓展",
										value: "团建拓展"
									},
									{
										name: "游戏电玩",
										value: "游戏电玩"
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
						submenu: [
							{
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
							},
							{
								name: "价格",
								submenu: [{
										name: "50以下",
										value: "50以下"
									},
									{
										name: "50-100",
										value: "50-100"
									},
									{
										name: "100-300",
										value: "100-300"
									},
									{
										name: "300以上",
										value: "300以上"
									}
								]
							}
						],

					},
				]
			}
		},
		methods: {
			
		}
	}
</script>
