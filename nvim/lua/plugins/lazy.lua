local lazypath = vim.fn.stdpath 'data' .. '/lazy/lazy.nvim'
if not vim.loop.fs_stat(lazypath) then
	local lazyrepo = 'https://github.com/folke/lazy.nvim.git'
	local out = vim.fn.system { 'git', 'clone', '--filter=blob:none', '--branch=stable', lazyrepo, lazypath }
	if vim.v.shell_error ~= 0 then
		error('Error cloning lazy.nvim:\n' .. out)
	end
end ---@diagnostic disable-next-line: undefined-field
vim.opt.rtp:prepend(lazypath)

require('lazy').setup({
	-- Color scheme
	'shaunsingh/solarized.nvim',
	{
		'scottmckendry/cyberdream.nvim',
		lazy = false,
		priority = 1000,
	},

	-- Git
	{
		'NeogitOrg/neogit',
		dependencies = {
			'nvim-lua/plenary.nvim', -- required
			'sindrets/diffview.nvim', -- optional - Diff integration
			'nvim-telescope/telescope.nvim', -- optional
		},
		-- config = true
	},

	'lewis6991/gitsigns.nvim',

	-- Obsidian
	{
		'epwalsh/obsidian.nvim',
		version = '*', -- recommended, use latest release instead of latest commit
		lazy = true,
		ft = 'markdown',
		dependencies = {
			'nvim-lua/plenary.nvim',
		},
	},

	-- Explorer replacement for easier work with files and directories
	{
		'stevearc/oil.nvim',
		opts = {},
		dependencies = { 'echasnovski/mini.icons' },
	},

	{
		'folke/noice.nvim',
		event = 'VeryLazy',
		opts = {
			-- add any options here
		},
		dependencies = {
			-- if you lazy-load any plugin below, make sure to add proper `module='...'` entries
			'MunifTanjim/nui.nvim',
			-- OPTIONAL:
			--   `nvim-notify` is only needed, if you want to use the notification view.
			--   If not available, we use `mini` as the fallback
			'rcarriga/nvim-notify',
		}
	},

	-- Telescope for finding files
	{
		'nvim-telescope/telescope.nvim',
		event = 'VimEnter',
		branch = '0.1.x',
		dependencies = {
			'nvim-lua/plenary.nvim',

			{
				'nvim-telescope/telescope-fzf-native.nvim',

				-- `build` is used to run some command when the plugin is installed/updated.
				-- This is only run then, not every time Neovim starts up.
				build = 'make',

				-- `cond` is a condition used to determine whether this plugin should be
				-- installed and loaded.
				cond = function()
					return vim.fn.executable 'make' == 1
				end,
			},

			{ 'nvim-telescope/telescope-ui-select.nvim' },

			-- Useful for getting pretty icons, but requires a Nerd Font.
			{ 'nvim-tree/nvim-web-devicons',            enabled = vim.g.have_nerd_font },
		},
	},

	{ -- Highlight, edit, and navigate code
		'nvim-treesitter/nvim-treesitter',
		dependencies = {
			'nvim-treesitter/nvim-treesitter-textobjects',
		},
		build = function()
			pcall(require('nvim-treesitter.install').update { with_sync = true })
		end
	},

	-- LSP
	{
		-- `lazydev` configures Lua LSP for your Neovim config, runtime and plugins
		-- used for completion, annotations and signatures of Neovim apis
		'folke/lazydev.nvim',
		ft = 'lua',
		opts = {
			library = {
				-- Load luvit types when the `vim.uv` word is found
				{ path = 'luvit-meta/library', words = { 'vim%.uv' } },
			},
		},
	},

	{ 'Bilal2453/luvit-meta',     lazy = true },

	{
		"Equilibris/nx.nvim",

		dependencies = {
			"nvim-telescope/telescope.nvim",
		},

		opts = {
			-- See below for config options
			nx_cmd_root = "npx nx",
		},

		-- Plugin will load when you use these keys
		keys = {
			{ "<leader>nx", "<cmd>Telescope nx actions<CR>", desc = "nx actions" }
		},
	},

	{
		-- Main LSP Configuration
		'neovim/nvim-lspconfig',
		dependencies = {
			-- Automatically install LSPs and related tools to stdpath for Neovim
			{ 'williamboman/mason.nvim', config = true }, -- NOTE: Must be loaded before dependants
			'williamboman/mason-lspconfig.nvim',
			'WhoIsSethDaniel/mason-tool-installer.nvim',

			-- Useful status updates for LSP.
			-- NOTE: `opts = {}` is the same as calling `require('fidget').setup({})`
			{ 'j-hui/fidget.nvim',       opts = {} },

			-- Allows extra capabilities provided by nvim-cmp
			'hrsh7th/cmp-nvim-lsp',
		},
	},

	-- Autocompletion
	{
		'hrsh7th/nvim-cmp',
		event = 'InsertEnter',
		dependencies = {
			-- Snippet Engine & its associated nvim-cmp source
			{
				'L3MON4D3/LuaSnip',
				build = (function()
					-- Build Step is needed for regex support in snippets.
					-- This step is not supported in many windows environments.
					-- Remove the below condition to re-enable on windows.
					if vim.fn.has 'win32' == 1 or vim.fn.executable 'make' == 0 then
						return
					end
					return 'make install_jsregexp'
				end)(),
				dependencies = {
					-- `friendly-snippets` contains a variety of premade snippets.
					--    See the README about individual language/framework/plugin snippets:
					--    https://github.com/rafamadriz/friendly-snippets
					-- {
					--   'rafamadriz/friendly-snippets',
					--   config = function()
					--     require('luasnip.loaders.from_vscode').lazy_load()
					--   end,
					-- },
				},
			},
			'saadparwaiz1/cmp_luasnip',

			-- Adds other completion capabilities.
			--  nvim-cmp does not ship with all sources by default. They are split
			--  into multiple repos for maintenance purposes.
			'hrsh7th/cmp-nvim-lsp',
			'hrsh7th/cmp-path',
		},
	},

	-- Harpoon
	{
		'ThePrimeagen/harpoon',
		branch = 'harpoon2',
		dependencies = { 'nvim-lua/plenary.nvim' }
	},

	-- Useful plugin to show you pending keybinds.
	'folke/which-key.nvim',

	-- Highlight todo, notes, etc in comments
	{ 'folke/todo-comments.nvim', event = 'VimEnter', dependencies = { 'nvim-lua/plenary.nvim' }, opts = { signs = false } },

	-- AI
	'zbirenbaum/copilot.lua',
})
