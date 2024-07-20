-- File saving
vim.keymap.set('n', '<leader>ww', vim.cmd.w, { desc = "[W]rite current file" })
vim.keymap.set('n', '<leader>wa', vim.cmd.wa, { desc = "[W]rite [A]ll" })

-- Centering screen on some default movements
vim.keymap.set("n", "<C-d>", "<C-d>zz")
vim.keymap.set("n", "<C-u>", "<C-u>zz")
vim.keymap.set("n", "n", "nzz")
vim.keymap.set("n", "N", "Nzz")

-- Yank to system clipboard
vim.keymap.set({ 'n', 'v' }, '<leader>y', '"+y', { desc = "Yank selected to clipboard" })
vim.keymap.set({ 'n', 'v' }, '<leader>yy', '"+y', { desc = "Yank line to clipboard" })
