use solana_program::{
    account_info::AccountInfo,
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
};

entrypoint!(process_instruction);

fn process_instruction(
    program_id:&Pubkey,
    accounts:&[AccountInfo],
    instruction_data:&[u8]
)->ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let payer = next_account_info(accounts_iter)?;
    let payee = next_account_info(accounts_iter)?;

    let amount = input
        .get(..8)
        .and_then(|slice| slice.try_into().ok())
        .map(u64::from_le_bytes)
        .ok_or(ProgramError::InvalidInstructionData)?;

    // let amount = i32::try_from_slice(input);

    msg!("Received request to transfer {:?} lamports from {:?} to {:?}.", 
        amount, payer.key, payee.key);
    msg!("  Processing transfer...");

    // Transfer from PAYER to PAYEE a specific amount:
    invoke(
        &system_instruction::transfer(payer.key, payee.key, amount),
        &[payer.clone(), payee.clone()],
    )?;
    
    msg!("Transfer completed successfully.");
    Ok(())
}
}