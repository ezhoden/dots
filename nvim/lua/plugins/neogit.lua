local neogit = require('neogit')

neogit.setup({
	kind = 'floating',
	popup = {
        kind = 'floating'
    },
    commit_popup = {
        kind = 'floating'
    },
    preview_buffer = {
        kind = 'floating'
    },
})

vim.keymap.set("n", '<leader>gg', neogit.open)
vim.keymap.set("n", '<leader>gc', ':Neogit commit<CR>')
