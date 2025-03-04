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
-- vim.keymap.set({ 'n', 'v' }, '<leader>yp', vim.ex, { desc = "Yank current file path to clipboard" })
-- execute 'let @+ = expand("%")'
vim.keymap.set({ 'n', 'v' }, '<leader>yp', function() vim.fn.setreg('+', vim.fn.expand('%')) end, { desc = "Yank current file path to clipboard" })

-- Diagnostic
vim.keymap.set('n', '<leader>pd', vim.diagnostic.goto_prev, { desc = "Go to [P]revious [D]iagnostic" })
vim.keymap.set('n', '<leader>nd', vim.diagnostic.goto_next, { desc = "Go to [N]ext [D]iagnostic" })
vim.keymap.set('n', '<leader>e', vim.diagnostic.open_float)
