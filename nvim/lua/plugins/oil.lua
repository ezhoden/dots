require('oil').setup({
  view_options = {
    show_hidden = true,
  }
})

vim.keymap.set("n", "<leader>qq", "<CMD>Oil<CR>", { desc = "Go to parent directory" })
