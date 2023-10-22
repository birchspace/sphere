use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct UserProfile {
    pub authority: Pubkey,
    pub last_confession: u8,
    pub confessions_count: u8,
    pub name: String,
}

#[account]
#[derive(Default)]
pub struct ConfessionAccount {
    pub authority: Pubkey,
    pub idx: u8,
    pub confession: String,
    pub describe: String,
}
