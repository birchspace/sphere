use anchor_lang::prelude::*; // 引入 anchor_lang 库的预定义模块

pub mod constant; // 引入常量模块
pub mod error; // 引入错误模块
pub mod states; // 引入状态模块
use crate::{constant::*, error::*, states::*}; // 引入常量、错误和状态模块中的所有内容

declare_id!("5Enc6iUf9iEs32h8ztVx86XiLUz4JL6tA3Gpz14sf1AV"); // 声明程序的 ID

#[program]
pub mod solana_confessions {
    use super::*; // 引入所有父模块中的内容

    pub fn initialize_user(ctx: Context<InitializeUser>, name: String) -> Result<()> {
        // 使用默认数据初始化用户配置文件
        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.authority = ctx.accounts.authority.key();
        user_profile.confessions_count = 0;
        user_profile.last_confession = 0;
        user_profile.name = name;

        msg!("Initialized user: {}", user_profile.authority); // 输出初始化用户的信息
        Ok(()) // 返回成功
    }

    pub fn add_confession(
        ctx: Context<AddConfession>,
        _confession: String,
        _describe: String,
    ) -> Result<()> {
        let confession_account = &mut ctx.accounts.confession_account;
        let user_profile = &mut ctx.accounts.user_profile;

        // 检查是否为空
        require!(!_confession.is_empty(), ConfessionError::ConfessionNotEmpty);

        // 使用参数填充状态
        confession_account.authority = ctx.accounts.authority.key();
        confession_account.idx = user_profile.last_confession;
        confession_account.confession = _confession;
        confession_account.describe = _describe;

        // 为 PDA 增加 idx
        user_profile.last_confession = user_profile.last_confession.checked_add(1).unwrap();

        // 增加总数
        user_profile.confessions_count = user_profile.confessions_count.checked_add(1).unwrap();

        msg!(
            "Added confession '{}' from {}",
            confession_account.confession,
            user_profile.authority
        ); // 输出添加的信息
        msg!(
            "User {} has now a total of {} confessions",
            user_profile.authority,
            user_profile.confessions_count
        ); // 输出用户现在的总数

        Ok(()) // 返回成功
    }
}

#[derive(Accounts)]
#[instruction()]
pub struct InitializeUser<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        seeds = [USER_TAG,authority.key().as_ref()],
        bump,
        payer = authority,
        space = 8 + std::mem::size_of::<UserProfile>(),
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]
pub struct AddConfession<'info> {
    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(
        init,
        seeds = [CONFESSION_TAG, authority.key().as_ref(), &[user_profile.last_confession as u8].as_ref()],
        bump,
        payer = authority,
        space = std::mem::size_of::<ConfessionAccount>() + 8,
    )]
    pub confession_account: Box<Account<'info, ConfessionAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn bump(seeds: &[&[u8]], program_id: &Pubkey) -> u8 {
    let (_found_key, bump) = Pubkey::find_program_address(seeds, program_id);
    bump
}
