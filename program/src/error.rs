use anchor_lang::prelude::*;

#[error_code]
pub enum ConfessionError {
    #[msg("You are not authorized to perform this action.")]
    Unauthorized,
    #[msg("Not allowed.")]
    NotAllowed,
    #[msg("Confession can't be empty.")]
    ConfessionNotEmpty,
}
