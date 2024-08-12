local gs = require("gitsigns")

gs.setup({
	signs = {
		add = { text = '+' },
		change = { text = '~' },
		delete = { text = '_' },
		topdelete = { text = '‾' },
		changedelete = { text = '~' },
	},
	current_line_blame = true,
})

vim.keymap.set("n", '<leader>hp', gs.preview_hunk)
vim.keymap.set("n", '<leader>hs', ':Gitsigns stage_hunk<CR>')
vim.keymap.set("n", '<leader>hr', ':Gitsigns reset_hunk<CR>')
